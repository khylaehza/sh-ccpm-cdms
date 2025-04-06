import React from 'react';

export const CusPrimButton = ({
	label,
	onClick,
	color = 'secondary',
	w = 'full',
	text = 'black',
	type = 'button',
}) => {
	return (
		<button
			className={`bg-secondary text-${text} focus:border-black w-${w}  outline-none border-none h-12	`}
			onClick={onClick}
			type={type}
		>
			{label.toUpperCase()}
		</button>
	);
};

export const CusSecButton = ({
	label,
	onClick,
	color = 'seconday',
	w = 'full',
	text = 'black',
}) => {
	return (
		<button
			className={`bg-${color} text-${text} hover:border-black w-${w} mt-2 outline-none border-black shadow-sm`}
			onClick={onClick}
		>
			{label.toUpperCase()}
		</button>
	);
};
