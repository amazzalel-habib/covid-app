import { Button, ButtonGroup, Grid, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapCases from "../../components/MapCases";
import MoreData from "../../components/MoreData";
import { Days2Ago, Days3Ago, YesterDay } from "../../constants";
import { IRootState } from "../../store/reducers";
import { changeDailyDate, fetchDailyDataAction } from "../../store/reducers/daily-cases-data-reducer";

const CustomButton = withStyles({
    root: {
        color: '#fff',
        "&:disabled": {
            color: '#CCC',
            textDecoration: 'underline',
        }
    },

})(Button);

export default function Home() {
    const { data, status, date }: any = useSelector((state: IRootState) => ({
        data: state.dailydata.data,
        date: state.dailydata.date,
        status: state.dailydata.status
    }))
    const [selectedRegion, setSelectedRegion] = useState<string>("")
    const onChangeSelect = (newSelect) => {
        if (newSelect === selectedRegion) {
            setSelectedRegion("");
        } else {
            setSelectedRegion(newSelect);
        }
    }
    const changeDate = (newDate: Date) => {
        dispatch(changeDailyDate(newDate));
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDailyDataAction(date))
    }, [dispatch, date]);
    return <Grid container>
        <div style={{ position: 'absolute', zIndex: 1, padding: 4, color: "#ccc", margin: 8 }} >
            <ButtonGroup color="inherit" variant="text" size="small">
                <CustomButton disabled={date === Days3Ago} color="inherit" onClick={() => changeDate(Days3Ago)} size="small">
                    {"Last 3 days"}
                </CustomButton>
                <CustomButton disabled={date === Days2Ago} color="inherit" onClick={() => changeDate(Days2Ago)} size="small">
                    {"Last 2 days"}
                </CustomButton>
                <CustomButton disabled={date === YesterDay} color="inherit" onClick={() => changeDate(YesterDay)} size="small">
                    {"Yesterday"}
                </CustomButton>
            </ButtonGroup>
        </div>
        <MapCases  onChangeSelectedRegion={onChangeSelect}  data={data} />
        <div style={{ backgroundColor: '#1f2124', width: '100%',  padding:'1rem' }}>
            <MoreData/>
        </div>
    </Grid>
}