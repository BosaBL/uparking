from pprint import pprint

from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        """
        Changing the confirmation URL to fit the domain that we are working on
        """

        url = "https://csep.dev/verify-account/" + emailconfirmation.key
        return url

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        activate_url = self.get_email_confirmation_url(
            request, emailconfirmation
        )
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "key": emailconfirmation.key,
        }
        if signup:
            email_template = "account/email/email_confirmation_signup"
        else:
            email_template = "account/email/email_confirmation"
        self.send_mail(
            email_template, emailconfirmation.email_address.email, ctx
        )
