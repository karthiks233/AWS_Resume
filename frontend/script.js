
document.addEventListener('DOMContentLoaded', () => {
    const visitorCountElement = document.getElementById('visitor-count');

    fetch('https://nn97cic8g4.execute-api.eu-north-1.amazonaws.com/prod/VisitorCounterPython')
        .then(response => response.json())
        .then(data => {
            if (data && data.count !== undefined) {
                visitorCountElement.textContent = data.count;
            } else {
                console.error('Failed to retrieve visitor count:', data);
                visitorCountElement.textContent = 'Error Invalid Data';
            }
        })
        .catch(error => {
            console.error('Error fetching visitor count:', error);
            visitorCountElement.textContent = 'Error loading count';
        });
});
