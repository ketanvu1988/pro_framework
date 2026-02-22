INSERT INTO notification_templates (code, name, content, channel, subject) VALUES
('USER_WELCOME', 'Welcome Email', '<h1>Welcome aboard, [(${name})]!</h1><p>We are glad to have you.</p>', 'EMAIL', 'Welcome to Accelerator!'),
('OTP_VERIFY', 'OTP Code', 'Your verification code is: [(${otp})]', 'SMS', NULL),
('ORDER_CONFIRM', 'Order Confirmation', 'Hi [(${name})], your order [(${orderId})] is confirmed!', 'WHATSAPP', NULL)
ON CONFLICT (code) DO NOTHING;
