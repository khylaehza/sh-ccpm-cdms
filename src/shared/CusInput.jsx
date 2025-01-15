import React, { useState } from 'react';

const CusInput = ({
	name,
	label,
	value,
	onChange,
	onBlur,
	touch,
	error,
	placeholder,
	type = 'text',
	color = 'black',
	disabled,
	icon,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const isPasswordField = type === 'password';

	return (
		<div className='w-full flex flex-col gap-1'>
			<label
				htmlFor={name}
				className={`block text-sm font-medium text-${color} text-left`}
			>
				{label}
			</label>

			<div
				className={`mt-1 flex items-center w-full border ${
					touch && error ? 'border-red-500' : 'border-gray-300'
				} rounded-lg shadow-sm bg-gray-200`}
			>
				{icon && <div className='pl-3 text-gray-500'>{icon}</div>}

				<input
					name={name}
					className={`rounded-lg flex-1 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black ${
						disabled
							? 'bg-gray-100 cursor-not-allowed'
							: 'bg-gray-200'
					}`}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					placeholder={placeholder}
					type={isPasswordField && isPasswordVisible ? 'text' : type}
					disabled={disabled}
				/>

				{isPasswordField && (
					<div
						onClick={togglePasswordVisibility}
						className='pr-3 cursor-pointer text-gray-500'
					>
						{isPasswordVisible ? '🙈' : '👁️'}
					</div>
				)}
			</div>

			{touch && error ? (
				<div className='text-red-500 text-xs text-left'>{error}</div>
			) : null}
		</div>
	);
};

export default CusInput;
