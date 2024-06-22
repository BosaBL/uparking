from channels.layers import get_channel_layer


async def update_estacionamientos():
    channel_layer = get_channel_layer()
    await channel_layer.group_send(
        "broadcast",
        {
            # This "type" defines which handler on the Consumer gets
            # called.
            "type": "update_estacionamientos",
            "message": "A",
        },
    )
    print("sent")
