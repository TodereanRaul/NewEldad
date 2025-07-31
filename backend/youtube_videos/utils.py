from googleapiclient.discovery import build
from django.utils.dateparse import parse_datetime
from .models import Video

API_KEY = "AIzaSyDbn9KfR1i0-Nt21P1L-9blu_bSA7KFWOE"       # <--- mets ta clé API ici
CHANNEL_ID = "UCK1HDeZhSMF5QGuruehRADw"     # <--- mets l'ID de ta chaîne

def fetch_videos():
    youtube = build('youtube', 'v3', developerKey=API_KEY)

    request = youtube.search().list(
        part="snippet",
        channelId=CHANNEL_ID,
        maxResults=50,
        order="date",
        type="video"
    )
    response = request.execute()

    for item in response['items']:
        title = item['snippet']['title']
        video_id = item['id']['videoId']
        thumbnail = item['snippet']['thumbnails']['high']['url']
        published_at = parse_datetime(item['snippet']['publishedAt'])

        # Classification
        title_lower = title.lower()
        if "music" in title_lower:
            category = "music"
        elif "kids" in title_lower:
            category = "kids"
        elif "podcast" in title_lower:
            category = "podcast"
        else:
            category = "autres"

        # Enregistrer ou mettre à jour
        Video.objects.update_or_create(
            video_id=video_id,
            defaults={
                "title": title,
                "thumbnail": thumbnail,
                "category": category,
                "published_at": published_at
            }
        )
