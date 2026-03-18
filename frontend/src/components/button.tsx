
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
}

// 2. Component hoàn toàn "ngốc" (Không gọi API, không chứa logic nghiệp vụ)
export const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    ...props // Lấy tất cả các props còn lại (như onClick)
}: ButtonProps) => {

    // Xử lý CSS (ví dụ dùng Tailwind hoặc CSS thuần)
    const baseStyle = "flex items-center justify-center px-4 py-2 rounded-md font-bold transition-all";

    const variantStyle =
        variant === 'primary' ? "bg-blue-600 text-white hover:bg-blue-700" :
            variant === 'danger' ? "bg-red-600 text-white hover:bg-red-700" :
                "bg-gray-200 text-gray-800 hover:bg-gray-300";

    return (
        <button
            className={`${baseStyle} ${variantStyle} ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {/* Nếu đang loading thì hiện chữ khác hoặc cục xoay xoay */}
            {isLoading ? 'Đang xử lý...' : children}
        </button>
    );
};