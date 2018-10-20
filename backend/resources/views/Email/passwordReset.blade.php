@component('mail::message')
Change Password Request

Click on button below to change reset password
@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
