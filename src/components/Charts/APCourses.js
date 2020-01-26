import React from "react";
import { ResponsiveBar } from "@nivo/bar";

/**
 * Main class component
 * @param {*} props
 */
function APCoursesChart(props) {

    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        const thisYearSchoolDataArray = getGroupedAPData(yearToSchoolArrayDataMap[year]);
        let thisYearPieCharts = getBarCharts(thisYearSchoolDataArray);

        allYearPieCharts.push(
            <div key={year} style={styles.yearChartsParent}>
                <span>{year}</span>
                {thisYearPieCharts}
            </div>
        )
    });

    return (
        <div id="ethnicity-pie-charts"
             style={styles.categoryChartsParent}
        >
            <h3 key="ethnicityHeading">AP Scores</h3>
            {allYearPieCharts}
        </div>
    );
}

//
// Helper Functions
//

/**
 * return array->[schoolName, array[schoolData]]
 * ignoring zero values
 */
function getGroupedAPData(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObj => {
        const schoolName = schoolObj._name;
        let thisSchoolData = {};
        let schoolDataArray = [];
        schoolDataArray = schoolObj._apArray;

        // get percentage calculation out of total students that we consider
        // let totalStudents = 0;
        // schoolDataArray.forEach(element => (totalStudents += element.value));
        // schoolDataArray.forEach(
        //     element =>
        //         (element.percentage = (
        //             (element.value / totalStudents) *
        //             100
        //         ).toFixed(2))
        // );
        thisSchoolData.id = schoolName;
        schoolDataArray.forEach(apObject => {
            thisSchoolData[apObject.id] = apObject.value;
        });
        chartData.push(thisSchoolData);

        // thisSchoolData.schoolName = schoolName;
        // thisSchoolData.dataArray = schoolDataArray;
        // chartData.push(thisSchoolData);
    });

    console.log("AP chart data");
    console.log(chartData);

    return chartData;
}


const styles = {
    root: {
        fontFamily: "consolas, sans-serif",
        textAlign: "center",
        position: "relative",
        width: "100%",
        height: 300
    },

    totalLabel: {
        fontSize: 24
    },
    categoryChartsParent: {
        display: "flex",
        flexDirection: "column",
        // height: "50%",
        width: "100%",
        borderStyle: "ridge",
        padding: "10px",
        backgroundColor: "#6f7348"
    },
    yearChartsParent: {
        display: "flex",
        flexDirection: "row"
    }
};

function getBarCharts(schoolDataArray) {
    let barChart = [];
    const schoolData = schoolDataArray;
    // console.log("bar chart data here");
    // console.log(schoolData);

    barChart.push(
        <div
            key={"ap-course-bar-chart"}
            style={styles.root}>
            <div style={{ height: "90%", flexGrow: "1",
                width: "100%"
            }}>
                <ResponsiveBar
                    data={schoolData}
                    keys={[ 'AP1', 'AP2', 'AP3', 'AP4', 'AP5']}
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.2}
                    groupMode="stacked"
                    // groupMode="grouped"
                    colors={{ scheme: 'nivo' }}
                    minValue={0}
                    // maxValue={maxEnrolledCount}
                    tooltip={data => {
                        return getTooltipHTML(data);
                    }}
                    isInteractive={false}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    // fill={[
                    //     {
                    //         match: {
                    //             id: 'fries'
                    //         },
                    //         id: 'dots'
                    //     },
                    //     {
                    //         match: {
                    //             id: 'sandwich'
                    //         },
                    //         id: 'lines'
                    //     }
                    // ]}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    // axisBottom={{
                    //     tickSize: 5,
                    //     tickPadding: 5,
                    //     tickRotation: 0,
                    //     legend: 'country',
                    //     legendPosition: 'middle',
                    //     legendOffset: 32
                    // }}
                    // axisLeft={{
                    //     tickSize: 5,
                    //     tickPadding: 5,
                    //     tickRotation: 0,
                    //     legend: 'Students Enrolled',
                    //     legendPosition: 'middle',
                    //     legendOffset: -40
                    // }}
                    // labelSkipWidth={12}
                    // labelSkipHeight={12}
                    // labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        </div>
    );
    // });

    return barChart;
}

export default APCoursesChart;

function getTooltipHTML(data) {
    return (
        <div
            id={data.id}
            style={{ display: "flex", flexDirection: "column", color: "black" }}
        >
            <div>
                {data.desc}: {data.value}
            </div>
            <div>Percentage: {data.percentage}%</div>
        </div>
    );
}