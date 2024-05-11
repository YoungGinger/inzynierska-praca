from rest_framework.generics import GenericAPIView
from api.seralizers import LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.contrib.auth import login, authenticate
from rest_framework import status


User = get_user_model()

from api.seralizers import LoginSerializer


class LoginView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(username=serializer.validated_data['login'], password=serializer.validated_data['password'])
        if not user:
            return Response({'error': 'invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        return Response(serializer.data)