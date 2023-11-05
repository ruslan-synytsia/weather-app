import { useEffect, useRef } from "react"
import style from './TemperatureChart5days.module.css'
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisLeft,
} from "d3"
import { groupByDates } from '../../functions/groupByDates/groupByDates'

export const TemperatureChart5days = (props) => {
  const svgRef = useRef()
  
  const data = groupByDates(props.data)
  const tempArray = data.slice(0, 5).map(item => Math.ceil(item.maxTemp))
  const windArray = data.slice(0, 5).map(item => ({ speed: item.averageWind }))
  const iconArray = data.slice(0, 5).map(item => (item.icon))
  const dateArray = data.slice(0, 5).map(item => new Date(item.date * 1000).toLocaleDateString().slice(0, 5))
  
  const renderChart = () => {
    const body = document.querySelector('body')
    const viewportWidth = body.clientWidth
    const step = viewportWidth / tempArray.length - 1

    const pathWidth = (tempArray.length - 1) * step
    const margin = 15

    const svg = select(svgRef.current)
      .append("svg")
      .attr("width", pathWidth + 100)
      .attr("height", 230)

    svg.append("g").attr("transform", `translate(${margin}, 0)`)

    const xScale = scaleLinear().domain([0, tempArray.length - 1]).range([0, pathWidth])
    const yScale = scaleLinear().domain([Math.min(...tempArray), Math.max(...tempArray)]).range([80, 0])

    const xAxis = axisBottom(xScale).ticks(tempArray.length)
    svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis)

    const yAxis = axisLeft(yScale)
    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis)

    const myLine = line().x((d, i) => xScale(i) + (margin * 3) - 7).y((d) => yScale(d) + margin * 4).curve(curveCardinal)
    svg
      .append("path")
      .datum(tempArray)
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .style("stroke-width", "3px")

    const labelsGroup = svg.append("g").attr("transform", `translate(${margin}, 0)`)

    const labels = labelsGroup.selectAll(".label").data(tempArray).enter().append("g").attr("class", "label").attr("transform", (d, i) => `translate(${xScale(i)+margin*2}, ${yScale(d)+margin*4})`)
    labels
      .append("text")
      .attr("x", -5.5)
      .attr("y", -margin)
      .text((d) => d + "\u00B0")
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")

    svg
      .selectAll(".point")
      .data(tempArray)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d, i) => xScale(i) + (margin * 3) - 7)
      .attr("cy", (d) => yScale(d) + margin * 4)
      .attr("r", 6)
      .style("fill", "#ffffff")

    const windYScale = scaleLinear().domain([0, 100]).range([120, 120])
    const windLabels = svg
      .selectAll(".wind-label")
      .data(windArray)
      .enter()
      .append("g")
      .attr("class", "wind-label")
      .attr("transform", (d, i) => `translate(${xScale(i)+margin}, ${windYScale(0) + margin})`)

    windLabels
      .append("text")
      .attr("x", (margin * 2) - 7)
      .attr("y", margin * 6)
      .text((d) => `${d.speed}m/s`)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .style('font-size', '.75rem')

    const iconYScale = scaleLinear().domain([0, 100]).range([120, 120])
    const icons = labelsGroup
      .selectAll(".icon-label")
      .data(iconArray)
      .enter()
      .append("g")
      .attr("class", "icon-label")
      .attr("transform", (d, i) => `translate(${xScale(i) + margin * 2}, ${iconYScale(0) + margin})`)

    icons
      .append("image")
      .attr("x", (-margin * 2) - 5)
      .attr("y", '1.5rem')
      .attr("width", '3.5rem')
      .attr("height", '3.5rem')
      .attr("xlink:href", d => {
        const url = `https://openweathermap.org/img/wn/${d}.png`
        return url
    });

    const dateYScale = scaleLinear().domain([0, 100]).range([120, 120])
    const dateLabels = svg
      .selectAll(".date-label")
      .data(dateArray)
      .enter()
      .append("g")
      .attr("class", "date-label")
      .attr("transform", (d, i) => `translate(${xScale(i) + margin * 2}, ${dateYScale(0) + margin})`)
      .style('font-size', '1.15rem')

    dateLabels
      .append("text")
      .attr("x", 10)
      .attr("y", -120)
      .text((d) => d === dateArray[0] ? 'Today' : d)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
    
    return svg
  }

  useEffect(() => {
    const resizeHandler = () => {
      select(svgRef.current).selectAll("*").remove() // Clear previous chart
      renderChart() // Render updated chart
    }
    window.addEventListener('resize', resizeHandler)

    // Initial chart render
    renderChart()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return <div className={style.chart} ref={svgRef}></div>
}