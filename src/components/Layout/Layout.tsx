import React, {ReactNode} from 'react';
import NavbarComponent from "../Navbar/Navbar";

interface LayoutProps {
	children: ReactNode
}

const LayoutComponent: React.FC<LayoutProps> = ({children}) => {
	return (
		<>
			<NavbarComponent />
			<main>
				{children}
			</main>
		</>
	);
};

export default LayoutComponent;
