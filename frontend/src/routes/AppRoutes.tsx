// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/home";
import Layout from '../layout/layout';
import "tailwindcss";
import Contact from '../pages/contact';
import About from '../pages/about';
import AddProperty from '../pages/properties/addProperty';
import Login from '../pages/autentication/login';
import PropertyDetails from "../pages/properties/properyDetails";
import PropertyManagement from '../pages/adminPanel';
import UpdateProperty from '../pages/properties/updateProperty';
import useProperties from '../pages/properties/properties';
import ComingSoon from '../components/commingSoon';

const AppRoutes: React.FC = () => {
    const { properties, setProperties } = useProperties();

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home properties={properties}
                    setProperties={setProperties} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/addproperty" element={<AddProperty />} />
                <Route path="/updateproperty/:id" element={<UpdateProperty />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route
                    path="/adminpanel"
                    element={
                        <PropertyManagement
                            properties={properties}
                            setProperties={setProperties}
                        />
                    }
                />

            </Route>
            <Route path='/comingsoon'   element={<ComingSoon />} />
            <Route path="/login" element={<Login />} />

        </Routes>
    );
};

export default AppRoutes;
