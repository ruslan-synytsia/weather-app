import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const SunriseSunsetChart = () => {
    const svgRef = useRef(null);

    function convertTimeToDecimal() {
        const currentTime = new Date().toLocaleTimeString()
        const [hours, minutes, seconds] = currentTime.split(":").map(Number);
        const decimalValue = hours + minutes / 60 + seconds / 3600;
        if (decimalValue < 12) {
            return (decimalValue / 12 - 1).toFixed(2);
        } else {
            return ((decimalValue - 12) / 12).toFixed(2);
        }
    }

    useEffect(() => {
        // Создаем данные для графика
        const data = d3.range(-1, 1, 0.01).map(x => ({ x: x, y: -x * x }));
        const val = convertTimeToDecimal()

        // Определяем размеры графика
        const width = 70
        const height = 35

        // Создаем контейнер для графика
        const svg = d3.select(svgRef.current)
            .append("g")
            .attr("transform", `translate(0)`);

        // Создаем шкалу для осей
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x))
            .range([10, width]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y))
            .range([height, 10]);

        // Создаем линию графика
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        // Добавляем линию графика на график
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Добавляем точку
        const circle = svg.append("circle")
            .attr("r", 4)
            .attr("fill", "#FFFFFF");

        // Обновляем положение точки при изменении значения val
        const updateCircle = () => {
            const xValue = xScale(val);
            const yValue = yScale(-val * val);
            circle.attr("cx", xValue)
                .attr("cy", yValue);
        };
        updateCircle();

    }, []);

    return (
        <svg ref={svgRef} width="80" height="50"></svg>
    );
};