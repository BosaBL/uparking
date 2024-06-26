# myapp/consumers.py
import json

from channels.generic.websocket import AsyncWebsocketConsumer


class EstacionamientoConsumer(AsyncWebsocketConsumer):
    groups = ["broadcast"]

    async def connect(self):
        await self.accept()

    async def disconnect(self, code):
        pass

    async def update_estacionamientos(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": event["type"].upper(),
                }
            )
        )
