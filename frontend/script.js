
document.addEventListener('DOMContentLoaded', () => {
    const visitorCountElement = document.getElementById('visitor-count');

    fetch('https://x2hhujxz3c.execute-api.us-east-1.amazonaws.com/Prod/VisitorCounter')
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
