from django.core.management.base import BaseCommand
from youtube_videos.utils import fetch_videos

class Command(BaseCommand):
    help = "Fetch et enregistre les vidéos YouTube"

    def handle(self, *args, **options):
        fetch_videos()
        self.stdout.write(self.style.SUCCESS("Vidéos mises à jour"))
