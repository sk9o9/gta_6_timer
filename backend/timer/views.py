from datetime import datetime, timezone
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

GTA6_RELEASE_DATE = datetime(2026, 11, 19, 0, 0, 0, tzinfo=timezone.utc)


@api_view(['GET'])
def countdown(request):
    now = datetime.now(timezone.utc)
    remaining = (GTA6_RELEASE_DATE - now).total_seconds()

    return Response({
        "release_date": GTA6_RELEASE_DATE.isoformat(),
        "server_time": now.isoformat(),
        "seconds_remaining": max(0, int(remaining)),
        "released": remaining <= 0,
    })

