from django.urls import reverse
from rest_framework.test import APITestCase


class MeasurementsTest(APITestCase):
    def test_get_measurements(self):
        url = reverse('measurements')
        response = self.client.get(url, format='json')
        self.assertIsNotNone(response)

