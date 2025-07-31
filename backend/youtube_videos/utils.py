from googleapiclient.discovery import build
from django.utils.dateparse import parse_datetime
from .models import Video

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
        'tiktok', 'instagram', 'snapchat'
    ]
    return any(indicator in title_lower for indicator in reel_indicators)

def fetch_videos():
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    
    for channel_id, channel_config in CHANNELS.items():
        print(f"Fetching videos from channel: {channel_config['name']} -> Category: {channel_config['category']}")
        
        request = youtube.search().list(
            part="snippet",
            channelId=channel_id,
            maxResults=100,
            order="date",
            type="video",
            eventType="completed"  # Only fetch completed/published videos
        )
        response = request.execute()

        videos_added = 0
        reels_skipped = 0

        for item in response['items']:
            title = item['snippet']['title']
            
            # Skip reels completely
            if is_reel(title):
                print(f"SKIPPING REEL: {title}")
                reels_skipped += 1
                continue
            
            video_id = item['id']['videoId']
            thumbnail = item['snippet']['thumbnails']['high']['url']
            published_at = parse_datetime(item['snippet']['publishedAt'])

            # Use channel-specific category
            category = channel_config["category"]

            # Enregistrer ou mettre à jour
            Video.objects.update_or_create(
                video_id=video_id,
                defaults={
                    "title": title,
                    "thumbnail": thumbnail,
                    "category": category,
                    "published_at": published_at,
                    "channel_id": channel_id,
                    "channel_name": channel_config["name"]
                }
            )
            videos_added += 1
        
        print(f"Completed fetching from {channel_config['name']}")
        print(f"  - Videos added: {videos_added}")
        print(f"  - Reels skipped: {reels_skipped}")
