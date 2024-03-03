from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if isinstance(data, dict) and 'ErrorDetails' in data:
            response = {'errors': data}
        else:
            response = data

        return json.dumps(response, ensure_ascii=False).encode('utf-8')
