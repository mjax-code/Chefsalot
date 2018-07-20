from django.views import View
from django.shortcuts import render


class UserView(View):
    title = 'UserView'
    template = 'index.html'
    component = 'index.js'

    def get(self, request):
        # gets passed to react via window.props
        props = {
            'users': [
                {'username': 'alice'},
                {'username': 'bob'},
            ]
        }

        context = {
            'title': self.title,
            'component': self.component,
            'props': props,
        }

        return render(request, self.template, context)
