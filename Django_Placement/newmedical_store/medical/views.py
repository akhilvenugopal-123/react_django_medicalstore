from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .forms import MedicineForm
from .models import Medicine
from django.contrib.auth.decorators import login_required

# Create your views here.





def SignupPage(request):

    if request.method == 'POST':
        uname = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')

        if pass1!=pass2:
            return HttpResponse("Your password and confrom password are not Same!!")
        else:
            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
            return redirect('login')

    return render (request,'signup.html')


def LoginPage(request):
    if request.method=='POST':
        username=request.POST.get('username')
        pass1=request.POST.get('pass')
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            return HttpResponse ("Username or Password is incorrect!!!")

    return render (request,'login.html')

@login_required(login_url='login')
def LogoutPage(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def HomePage(request):
    medicine = Medicine.objects.all()
    
    return render(request,'home.html',{'medicine':medicine})

@login_required(login_url='login')
def add_medicine(request):
    if request.method == 'POST':
        form = MedicineForm(request.POST)
        if form.is_valid():
            form.save()
    else:
        form = MedicineForm()
    
    return render(request, 'add.html', {'form': form})

@login_required(login_url='login')
def edit(request,id):
    medicine = Medicine.objects.get(id=id)
    return render(request,'edit.html',{'medicine':medicine})

# @login_required(login_url='login')
# def update(request, id):  
#     medicine = Medicine.objects.get(id=id)  
#     form = MedicineForm(request.POST, instance = medicine)  
#     if form.is_valid():  
#         form.save()
#         return redirect('home')  
#     return render(request, 'edit.html', {'medicine': medicine})  

@login_required(login_url='login')
def update(request, id):  
    medicine = Medicine.objects.get(id=id)  
    form = MedicineForm(request.POST, instance=medicine)  
    if form.is_valid():  
        form.save()
        return redirect('home')  
    else:
        print(form.errors)  # Add this line to print form errors
    return render(request, 'edit.html', {'medicine': medicine})

@login_required(login_url='login')
def destroy(request, id):  
    medicine = Medicine.objects.get(id=id)
    medicine.delete()  
    return redirect('home')  

@login_required(login_url='login')
def search(request):
    if request.method == 'POST':
        searched = request.POST['searched']
        medicine = Medicine.objects.filter(name = searched)
    
    return render(request,'search.html',{'searched':searched,'medicine':medicine})
    