/**
 * Input validation and sanitization utilities
 */

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
        .substring(0, 500); // Limit length
};

/**
 * Validate phone number (Brazilian format)
 */
export const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
};

/**
 * Validate name (only letters and spaces)
 */
export const validateName = (name: string): boolean => {
    return name.trim().length >= 3;
};

/**
 * Format currency for display
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

/**
 * Validate and sanitize address
 */
export const sanitizeAddress = (address: string): string => {
    return address
        .trim()
        .replace(/[<>]/g, '')
        .substring(0, 200);
};

/**
 * Rate limiting helper for API calls
 */
class RateLimiter {
    private timestamps: number[] = [];
    private readonly maxRequests: number;
    private readonly timeWindow: number;

    constructor(maxRequests: number = 5, timeWindowMs: number = 60000) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindowMs;
    }

    canMakeRequest(): boolean {
        const now = Date.now();
        this.timestamps = this.timestamps.filter(t => now - t < this.timeWindow);

        if (this.timestamps.length < this.maxRequests) {
            this.timestamps.push(now);
            return true;
        }

        return false;
    }

    getRemainingTime(): number {
        if (this.timestamps.length === 0) return 0;
        const oldest = Math.min(...this.timestamps);
        return Math.max(0, this.timeWindow - (Date.now() - oldest));
    }
}

export const checkoutRateLimiter = new RateLimiter(3, 60000); // 3 requests per minute
