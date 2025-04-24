/** @format */

import { Suspense } from "react";
import Loading from "../Loading";
import { ComponentType } from "react";


const Loadable = (Component: ComponentType<any>) => (props: any) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;