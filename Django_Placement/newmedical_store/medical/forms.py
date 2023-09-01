from django import forms
from.models import Medicine

class MedicineForm(forms.ModelForm):
    class Meta:
        model = Medicine
        fields = ['id','name','description', 'price','remaining_stock','expiry_date','company']