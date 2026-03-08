// URL Shortener functionality for homepage

document.addEventListener('DOMContentLoaded', function() {
    const originalUrlInput = document.getElementById('originalUrl');
    const shortenBtn = document.getElementById('shortenBtn');
    const resultSection = document.getElementById('resultSection');
    const shortUrlInput = document.getElementById('shortUrl');
    const copyBtn = document.getElementById('copyBtn');

    if (!originalUrlInput || !shortenBtn) {
        return; // Not on the homepage
    }

    // URL validation function
    function isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    // Add protocol if missing
    function addProtocol(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'https://' + url;
        }
        return url;
    }

    // Show loading state
    function showLoading() {
        shortenBtn.disabled = true;
        shortenBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Shortening...';
    }

    // Hide loading state
    function hideLoading() {
        shortenBtn.disabled = false;
        shortenBtn.innerHTML = '<i class="fas fa-magic"></i> Shorten URL';
    }

    // Show error message
    function showError(message) {
        // Remove existing error
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #fee2e2;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border: 1px solid #fecaca;
            text-align: center;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        originalUrlInput.parentNode.appendChild(errorDiv);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Show success message
    function showSuccess() {
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Add success animation
        resultSection.style.opacity = '0';
        resultSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultSection.style.transition = 'all 0.5s ease';
            resultSection.style.opacity = '1';
            resultSection.style.transform = 'translateY(0)';
        }, 100);
    }

    // Handle URL shortening
    async function shortenUrl() {
        const originalUrl = originalUrlInput.value.trim();
        
        if (!originalUrl) {
            showError('Please enter a URL to shorten');
            originalUrlInput.focus();
            return;
        }

        const urlWithProtocol = addProtocol(originalUrl);
        
        if (!isValidUrl(urlWithProtocol)) {
            showError('Please enter a valid URL (e.g., https://example.com)');
            originalUrlInput.focus();
            return;
        }

        showLoading();

        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalUrl: urlWithProtocol })
            });

            const data = await response.json();

            if (response.ok) {
                shortUrlInput.value = data.shortUrl;
                showSuccess();
                
                // Update stats (optional - for demo purposes)
                updateStats();
            } else {
                showError(data.error || 'Failed to shorten URL. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            hideLoading();
        }
    }

    // Update stats on page (demo functionality)
    function updateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
            const newValue = currentValue + 1;
            
            // Animate the number change
            let current = currentValue;
            const increment = 1;
            const timer = setInterval(() => {
                current += increment;
                if (current >= newValue) {
                    stat.textContent = newValue.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = current.toLocaleString();
                }
            }, 50);
        });
    }

    // Copy to clipboard functionality
    function copyToClipboard() {
        const shortUrl = shortUrlInput.value;
        
        if (!shortUrl) {
            return;
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(shortUrl).then(() => {
                showCopySuccess();
            }).catch(() => {
                fallbackCopy();
            });
        } else {
            fallbackCopy();
        }
    }

    function fallbackCopy() {
        shortUrlInput.select();
        shortUrlInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            showCopySuccess();
        } catch (err) {
            console.error('Failed to copy: ', err);
            showCopyError();
        }
    }

    function showCopySuccess() {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }

    function showCopyError() {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
        copyBtn.style.background = '#ef4444';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }

    // Event listeners
    shortenBtn.addEventListener('click', shortenUrl);
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }

    // Handle Enter key in input
    originalUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            shortenUrl();
        }
    });

    // Clear error when user starts typing
    originalUrlInput.addEventListener('input', function() {
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });

    // Auto-focus on input when page loads
    originalUrlInput.focus();

    // Add placeholder animation
    const placeholders = [
        'Enter your long URL here...',
        'https://example.com/very-long-url',
        'Paste your YouTube link here...',
        'https://your-website.com/page',
        'Enter any URL to shorten...'
    ];

    let placeholderIndex = 0;
    
    function rotatePlaceholder() {
        if (document.activeElement !== originalUrlInput && !originalUrlInput.value) {
            originalUrlInput.placeholder = placeholders[placeholderIndex];
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        }
    }

    // Rotate placeholder every 3 seconds
    setInterval(rotatePlaceholder, 3000);

    // URL Management (if on admin page)
    loadExistingUrls();

    async function loadExistingUrls() {
        try {
            const response = await fetch('/api/urls');
            const urls = await response.json();
            
            if (urls.length > 0) {
                displayUrlList(urls);
            }
        } catch (error) {
            console.error('Error loading URLs:', error);
        }
    }

    function displayUrlList(urls) {
        // Check if we have a container for URL list
        let urlListContainer = document.getElementById('urlList');
        
        if (!urlListContainer) {
            // Create URL list container if it doesn't exist
            urlListContainer = document.createElement('div');
            urlListContainer.id = 'urlList';
            urlListContainer.className = 'url-list-container';
            
            const container = document.querySelector('.hero-container');
            if (container) {
                container.appendChild(urlListContainer);
            }
        }

        if (urls.length === 0) {
            urlListContainer.innerHTML = '<p class="no-urls">No URLs created yet. Create your first short URL above!</p>';
            return;
        }

        const urlListHTML = `
            <div class="url-list">
                <h3><i class="fas fa-list"></i> Your Short URLs</h3>
                <div class="url-items">
                    ${urls.map(url => `
                        <div class="url-item">
                            <div class="url-info">
                                <div class="short-url">
                                    <strong>${window.location.origin}/${url.shortCode}</strong>
                                </div>
                                <div class="original-url">${url.originalUrl}</div>
                                <div class="url-stats">
                                    <span><i class="fas fa-mouse-pointer"></i> ${url.clicks} clicks</span>
                                    <span><i class="fas fa-calendar"></i> ${new Date(url.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div class="url-actions">
                                <button class="btn-copy" onclick="copyUrl('${window.location.origin}/${url.shortCode}')">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        urlListContainer.innerHTML = urlListHTML;
    }

    // Global functions for URL management
    window.copyUrl = function(url) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('URL copied to clipboard!', 'success');
            });
        } else {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('URL copied to clipboard!', 'success');
        }
    };

    window.deleteUrl = async function(shortCode) {
        if (!confirm('Are you sure you want to delete this URL?')) {
            return;
        }

        try {
            const response = await fetch(`/api/delete/${shortCode}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showNotification('URL deleted successfully!', 'success');
                loadExistingUrls(); // Reload the list
            } else {
                showNotification('Failed to delete URL', 'error');
            }
        } catch (error) {
            console.error('Error deleting URL:', error);
            showNotification('Error deleting URL', 'error');
        }
    };

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#6366f1';
        }

        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            ${message}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .url-list-container {
            margin-top: 4rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .url-list {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 2rem;
        }

        .url-list h3 {
            color: white;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .url-items {
            display: grid;
            gap: 1rem;
        }

        .url-item {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }

        .url-info {
            flex: 1;
        }

        .short-url {
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
        }

        .original-url {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            word-break: break-all;
        }

        .url-stats {
            display: flex;
            gap: 1rem;
            font-size: 0.8rem;
            color: #888;
        }

        .url-actions {
            display: flex;
            gap: 0.5rem;
        }

        .btn-copy, .btn-delete {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .btn-copy {
            background: #10b981;
            color: white;
        }

        .btn-copy:hover {
            background: #059669;
        }

        .btn-delete {
            background: #ef4444;
            color: white;
        }

        .btn-delete:hover {
            background: #dc2626;
        }

        .no-urls {
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            font-style: italic;
            padding: 2rem;
        }

        @media (max-width: 768px) {
            .url-item {
                flex-direction: column;
                align-items: stretch;
            }

            .url-actions {
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('URL Shortener functionality loaded! ✨');
});