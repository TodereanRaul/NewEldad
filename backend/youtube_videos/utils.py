from googleapiclient.discovery import build
from django.utils.dateparse import parse_datetime
from .models import Video
import re

API_KEY = "AIzaSyDbn9KfR1i0-Nt21P1L-9blu_bSA7KFWOE"

# Define channels with their specific categorization rules
CHANNELS = {
    "UCK1HDeZhSMF5QGuruehRADw": {
        "name": "Eldad Media",
        "category": "podcast"
    },
    "UCuBlMF281g1I3Kv8OTGZFNA": {
        "name": "Misiunea Eldad",
        "category": "music"
    },
    "UC5ojmmx9pOVdl2RpTx0MU8w": {
        "name": "Eldad Kids", 
        "category": "kids"
    },
}

def is_reel(title):
    """Check if video is a reel based on title patterns"""
    title_lower = title.lower()
    reel_indicators = [
        'reel', 'reels', '#reel', '#reels', 
        'short', 'shorts', '#short', '#shorts',
        'tiktok', 'instagram', 'snapchat', 'eldad short'
    ]
    return any(indicator in title_lower for indicator in reel_indicators)

def get_video_category_explicit(title, channel_config):
    # Robust: take last segment after | or /
    parts = [p.strip() for p in re.split(r'[|/]', title) if p.strip()]
    last = parts[-1] if parts else title
    last_norm = re.sub(r'\s+', ' ', last).strip().lower()
    # Ends-with checks (case-insensitive)
    if last_norm.endswith('eldad kids music'):
        return 'kids'
    if last_norm.endswith('eldad music'):
        return 'music'
    if last_norm.endswith('eldad podcast'):
        return 'podcast'
    return None

def should_include_video(title, published_at=None, live_broadcast_content='none'):
    """Filter out unwanted video types including upcoming videos"""
    title_lower = title.lower()
    
    # Exclude live/upcoming videos
    if live_broadcast_content in ['live', 'upcoming']:
        return False
    
    # Exclude shorts/reels
    if is_reel(title):
        return False
    
    # Exclude test/draft content
    exclude_keywords = ['test', 'proba', 'draft', 'sample', 'demo', 'verificare']
    if any(keyword in title_lower for keyword in exclude_keywords):
        return False
    
    # Exclude videos scheduled for future (extra safety check)
    if published_at:
        from django.utils import timezone
        now = timezone.now()
        if published_at > now:
            return False
    
    return True

def fetch_videos():
    youtube = build('youtube', 'v3', developerKey=API_KEY)

    for channel_id, channel_config in CHANNELS.items():
        print(f"Fetching videos from channel: {channel_config['name']}")

        # Only first 50, single request
        request = youtube.search().list(
            part="snippet",
            channelId=channel_id,
            maxResults=50,
            order="date",
            type="video"  # no eventType → includes uploads
        )
        response = request.execute()

        videos_added = 0
        videos_skipped = 0

        for item in response.get('items', []):
            title = item['snippet']['title']
            published_at = parse_datetime(item['snippet']['publishedAt'])
            live_broadcast_content = item['snippet'].get('liveBroadcastContent', 'none')

            if not should_include_video(title, published_at, live_broadcast_content):
                print(f"SKIPPING (filtered out): {title}")
                videos_skipped += 1
                continue

            category = get_video_category_explicit(title, channel_config)
            if category is None:
                print(f"SKIPPING (no explicit keywords): {title}")
                videos_skipped += 1
                continue

            video_id = item['id']['videoId']
            thumbnail = item['snippet']['thumbnails']['high']['url']

            Video.objects.update_or_create(
                video_id=video_id,
                defaults={
                    "title": title,
                    "thumbnail": thumbnail,
                    "category": category,
                    "published_at": published_at,
                    "channel_id": channel_id,
                    "channel_name": channel_config["name"],
                },
            )
            videos_added += 1
            print(f"ADDED: {title} -> Category: {category}")

        print(f"Completed fetching from {channel_config['name']}")
        print(f"  - Videos added: {videos_added}")
        print(f"  - Videos skipped: {videos_skipped}")