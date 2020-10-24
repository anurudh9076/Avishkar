from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,'index.html')

def board(request,room_name):
    return render(request,'board.html',{'room_name':room_name})