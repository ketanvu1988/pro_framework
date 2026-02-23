DROP TABLE IF EXISTS notification_templates;

CREATE TABLE notification_templates (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    content TEXT,
    channel VARCHAR(50),
    subject VARCHAR(255)
);

INSERT INTO notification_templates (code, name, content, channel, subject) VALUES
('USER_WELCOME', 'Welcome Email', '<h1>Welcome aboard, [(${name})]!</h1><p>We are glad to have you.</p>', 'EMAIL', 'Welcome to Accelerator!'),
('OTP_VERIFY', 'OTP Code', 'Your verification code is: [(${otp})]', 'SMS', NULL),
('ORDER_CONFIRM', 'Order Confirmation', 'Hi [(${name})], your order [(${orderId})] is confirmed!', 'WHATSAPP', NULL)
ON CONFLICT (code) DO NOTHING;
