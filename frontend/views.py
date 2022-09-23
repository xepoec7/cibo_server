from django.shortcuts import render
from django_renderpdf.views import PDFView
from api.models import Category, Product
from frontend.models import Footer_settings, Homepage_settings

def home_page(request):
    context = {
        "page": Homepage_settings.objects.get(id=1),
        "footer": Footer_settings.objects.get(id=1)
    }
    return render(request, "home.html", context)


def menu_page(request):
    context = {
        "categories": Category.objects.all(),
        "footer": Footer_settings.objects.get(id=1)
    }
    return render(request, "menu.html", context)



def pdf_page(request):
    categories = Category.objects.all()
    products = Product.objects.filter(on_menu=True)
    ctx = {
        "categories": categories,
        "products": products
    }
    return render(request, "pdf.html", ctx)



class PdfView(PDFView):
    template_name = 'pdf.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        context['categories'] = Category.objects.all()
        context['products'] = Product.objects.filter(on_menu=True)

        return context
