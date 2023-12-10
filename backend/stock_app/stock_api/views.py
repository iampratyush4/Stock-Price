import random
from django.shortcuts import render
import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.http import require_POST

@method_decorator(csrf_exempt, name='dispatch')
class StockListView(View):
    @method_decorator(csrf_exempt, name='dispatch')
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            n = int(request.POST.get('n', 0))
            print(f"Received number of stocks: {n}")  # Add this line for logging
            
            if n <= 0:
                return JsonResponse({'error': 'Invalid input for n'})

            # Fetch n stocks from Polygon API
            polygon_api_key = '4FPAmNwQcdi9ErtGYTMFQop0gsvOSTY2'
            stocks = self.fetch_stocks(n, polygon_api_key)

            # Add refreshInterval to each stock
            for stock in stocks:
                stock['refreshInterval'] = random.randint(1, 5)
                
            # Store stock data in a file (e.g., stocks.json)
            with open('stocks.json', 'w') as file:
                json.dump(stocks, file)

            return JsonResponse({'stocks': stocks})
        except Exception as e:
            return JsonResponse({'error': str(e)})
    def get(self, request, *args, **kwargs):
        # Handle GET requests (if needed)
        try:
            n = int(request.POST.get('n', 0))
            print(f"Received number of stocks: {n}")  # Add this line for logging
            
            if n <= 0:
                return JsonResponse({'error': 'Invalid input for n'})

            # Fetch n stocks from Polygon API
            polygon_api_key = '4FPAmNwQcdi9ErtGYTMFQop0gsvOSTY2'
            stocks = self.fetch_stocks(n, polygon_api_key)

            # Add refreshInterval to each stock
            for stock in stocks:
                stock['refreshInterval'] = random.randint(1, 5)
                
            # Store stock data in a file (e.g., stocks.json)
            with open('stocks.json', 'w') as file:
                json.dump(stocks, file)

            return JsonResponse({'stocks': stocks})
        except Exception as e:
            return JsonResponse({'error': str(e)})
        # return JsonResponse({'message': 'GET request handled'})

    def fetch_stocks(self, n, api_key):
        # Implement logic to fetch n stocks from Polygon API
        # Make sure to handle errors and parse the response accordingly
        # For simplicity, I'll provide a placeholder response
        return [{'symbol': 'AAPL'}, {'symbol': 'GOOGL'}, {'symbol': 'MSFT'}]
