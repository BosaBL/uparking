from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from .models import CustomUser
from .utils import check_rut

try:
    from allauth.account import app_settings as allauth_account_settings
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
    from allauth.socialaccount.helpers import complete_social_login
    from allauth.socialaccount.models import EmailAddress, SocialAccount
    from allauth.socialaccount.providers.base import AuthProcess
    from allauth.utils import get_username_max_length
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")


class RegisterSerializer(serializers.Serializer):
    username = None
    rut = serializers.CharField(max_length=15, required=True)
    p_nombre = serializers.CharField(max_length=50, required=True)
    s_nombre = serializers.CharField(max_length=50, required=True)
    p_apellido = serializers.CharField(max_length=50, required=True)
    s_apellido = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(required=allauth_account_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_account_settings.UNIQUE_EMAIL:
            if email and EmailAddress.objects.is_verified(email):
                raise serializers.ValidationError(
                    ("A user is already registered with this e-mail address."),
                )
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError(("The two password fields didn't match."))
        return data

    def validate_rut(self, rut):
        try:
            rut, dv = rut.strip().replace(".", "").split("-")
            check_rut(rut, dv)
            rut = int(rut)
        except:
            raise serializers.ValidationError("Rut inválido.")

        return rut

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        return {
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
            "rut": self.validated_data.get("rut", ""),
            "p_nombre": self.validated_data.get("p_nombre", ""),
            "s_nombre": self.validated_data.get("s_nombre", ""),
            "p_apellido": self.validated_data.get("p_apellido", ""),
            "s_apellido": self.validated_data.get("s_apellido", ""),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user = adapter.save_user(request, user, self, commit=False)
        if "password1" in self.cleaned_data:
            try:
                adapter.clean_password(self.cleaned_data["password1"], user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError(
                    detail=serializers.as_serializer_error(exc)
                )
        user.rut = self.cleaned_data.get("rut")
        user.p_nombre = self.cleaned_data.get("p_nombre")
        user.s_nombre = self.cleaned_data.get("s_nombre")
        user.p_apellido = self.cleaned_data.get("p_apellido")
        user.s_apellido = self.cleaned_data.get("s_apellido")

        user.save()
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user


class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        extra_fields = UserDetailsSerializer.Meta.extra_fields + [
            "rut",
            "p_nombre",
            "s_nombre",
            "p_apellido",
            "s_apellido",
            "rol",
        ]
        fields = UserDetailsSerializer.Meta.fields + (*extra_fields,)
        read_only_fields = ("",)
