import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface CustomButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function CustomButton({
  title,
  icon,
  onPress,
  disabled = false,
  size = 'medium',
  className = '',
}: CustomButtonProps) {
  const sizeClasses = {
    small: 'px-4 py-2',
    medium: 'px-6 py-3',
    large: 'px-8 py-4',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const iconSizeClasses = {
    small: 14,
    medium: 16,
    large: 18,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`
        bg-[#ce4a4a] 
        rounded-lg 
        flex-row 
        items-center 
        justify-center 
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50' : 'active:opacity-80'}
        ${className}
      `}
      style={{ backgroundColor: '#ce4a4a' }}
    >
      {icon && (
        <FontAwesome
          name={icon as any}
          size={iconSizeClasses[size]}
          color="white"
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        className={`
          text-white 
          font-semibold 
          ${textSizeClasses[size]}
          ${icon ? 'ml-2' : ''}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
