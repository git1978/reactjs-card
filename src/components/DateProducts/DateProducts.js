import React, { useState } from 'react';
import { Container, Row, Col, Form, Badge } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './DateProducts.scss'; // For custom styles (if needed)

function DateProducts() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle the date range change
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setSelectedRange(`${start.toLocaleDateString()} - ${end.toLocaleDateString()}`);
      setShowDatePicker(false);  // Hide DatePicker after selecting a range
    }
  };

  // Toggle DatePicker visibility when input is clicked
  const handleInputClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
      <Row>
        <Col md={6}>
          <Form.Group controlId="dateRange">
            <Form.Label>Select Date Range</Form.Label>
            <Form.Control
              type="text"
              value={selectedRange || ''}
              onClick={handleInputClick}
              placeholder="Click to select date range"
              readOnly
            />
            {showDatePicker && (
              <DatePicker
                selected={startDate}
                onChange={(dates) => handleDateChange(dates[0], dates[1])}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="selectedRange">
            <Form.Label>Selected Date Range</Form.Label>
            {selectedRange && (
              <Badge pill bg="primary">
                {selectedRange}
              </Badge>
            )}
          </Form.Group>
        </Col>
      </Row>
  );
}

export default DateProducts;
