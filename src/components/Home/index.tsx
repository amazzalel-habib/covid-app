import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/reducers";
import { TestAction } from "../../store/reducers/test-reducer";


export default function Home() {
    const { data, status }: any = useSelector((state: IRootState) => ({
        data: state.test.data,
        status: state.test.status
    }))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(TestAction())
    }, [dispatch]);
    return <div>
        Home
        data:{data}
        status: {status}
    </div>
}