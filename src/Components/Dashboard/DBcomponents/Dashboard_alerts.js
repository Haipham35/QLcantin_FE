import {  Card } from 'react-bootstrap';
import ReactApexChart from "react-apexcharts"
import React from 'react';

function StocksPie(props) {

  let data = {
    series: [props.total,props.alerts],
    options: {
      fill: {
        colors: ['#ed9e2f', '#2d47f7', '#2fed3c', '#2fedd4'],
        opacity: 0.9,
        type: 'solid',
        gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
        }
      },
      labels: ['Total Stocks', props.piename],
      colors: ['#ed9e2f', '#2d47f7', '#2fed3c', '#2fedd4'],
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: -8,
        offsetY: 0,
        labels: {
          colors: undefined,
          useSeriesColors: true
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: ['#ed9e2f', '#2d47f7', '#2fed3c', '#2fedd4'],
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },

      dataLabels: {
        enabled: false,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return val
        }
      },
      plotOptions: {


        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
          },

          donut: {
            size: '85%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Poppins-SemiBold',
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
                formatter: function (val) {
                  return val
                }
              },
              value: {
                show: true,
                fontSize: '36px',
                fontFamily: 'Poppins-SemiBold',
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val
                }
              },
              total: {
                show: true,
                showAlways: true,
                label: props.piename,
                fontSize: '18px',
                fontFamily: 'Poppins-Medium',
                color: '#7e7e7e',
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => b, 0);
                  const final = Number(sum)

                  return final
                }
              }
            }
          },
        }
      }
    }
  }
  
  return (
    <>
      <Card className='Recent-Users'>
        <Card.Header>

          <Card.Title as='h5'><h5 style={{ fontSize: 22, fontFamily: 'Poppins-SemiBold' }}>{props.name}</h5>
          </Card.Title>
        </Card.Header>
        <Card.Body className='px-0 py-2'>
          <div style={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ReactApexChart
              options={data.options}
              series={data.series}
              type="donut"
              width="380"
            />
          </div>

        </Card.Body>
      </Card>

    </>
  )
}
export default StocksPie