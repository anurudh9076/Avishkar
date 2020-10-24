import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class BoardConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'board_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        X = text_data_json['X']
        Y = text_data_json['Y']
        print(X,Y)

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'board_message',
                'X': X,
                'Y':Y
            }
        )

    # Receive message from room group
    def board_message(self, event):
        X = event['X'],
        Y= event['Y']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'X': X,
            'Y': Y
        }))