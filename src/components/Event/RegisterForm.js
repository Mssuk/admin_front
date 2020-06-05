import React, { useState } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CardImg,
} from 'reactstrap';
import Editor from '../utils/ReactPill';

export default function RegisterForm({
  coupon,
  sendForm,
  formVal,
  handleSubmit,
}) {
  const handleChangeFile = (e, v) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      if (v === 1) {
        sendForm({
          ...formVal,
          thumbnailImg: file,
          thumbnailUrl: reader.result,
        });
      } else {
        sendForm({
          ...formVal,
          contextImg: file,
          contextImgUrl: reader.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  //form 내용들
  const handleChange = (e) => {
    sendForm({
      ...formVal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form id="ev-form" onSubmit={handleSubmit}>
      <FormGroup row>
        <Label for="startDate" sm={2}>
          이벤트 시작일
        </Label>
        <Col sm={5}>
          <Input
            type="date"
            name="startDate"
            id="startDate"
            placeholder="date placeholder"
            value={formVal.startDate}
            onChange={handleChange}
          />
        </Col>
        <Col sm={5}>
          <Input
            type="time"
            name="startTime"
            id="startTime"
            placeholder="date placeholder"
            value={
              formVal.startTime
                ? formVal.startTime
                : sendForm({ ...formVal, startTime: '00:00' })
            }
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="endDate" sm={2}>
          이벤트 종료일
        </Label>
        <Col sm={5}>
          <Input
            type="date"
            name="endDate"
            id="endDate"
            placeholder="date placeholder"
            value={formVal.endDate}
            onChange={handleChange}
          />
        </Col>
        <Col sm={5}>
          <Input
            type="time"
            name="endTime"
            id="endTime"
            placeholder="date placeholder"
            value={
              formVal.endTime
                ? formVal.endTime
                : sendForm({ ...formVal, endTime: '23:59' })
            }
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="eventTitle" sm={2}>
          글 제목
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="eventTitle"
            id="eventTitle"
            style={{ fontWeight: 'bold', color: 'black' }}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="eventContent" sm={2}>
          글 내용
        </Label>
        <Col sm={10}>
          <Editor formVal={formVal} sendForm={sendForm} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="image1" sm={2}>
          이미지1(썸네일)
        </Label>
        <Col sm={3}>
          <FormText color="muted">
            리스트에 보여지는 이미지입니다. <br />
            (권장사이즈 588x174)
          </FormText>
          <input
            className="fileInput"
            type="file"
            onChange={(e) => handleChangeFile(e, 1)}
          />
        </Col>
        <Col sm={7}>
          {formVal.thumbnailUrl ? (
            <div style={{ width: '588px', height: '174px', margin: '0 auto' }}>
              <img
                src={formVal.thumbnailUrl}
                alt="썸네일이미지"
                style={{ width: 'inherit', height: 'inherit' }}
              />
            </div>
          ) : (
            <div></div>
          )}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="image2" sm={2}>
          이미지2(본문)
        </Label>
        <Col sm={4}>
          <FormText color="muted">본문에 삽입할 이미지입니다.</FormText>
          <input
            className="fileInput2"
            type="file"
            onChange={(e) => handleChangeFile(e, 2)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleFile" sm={2}>
          첨부 쿠폰
        </Label>
        <Col sm={5}></Col>
        <Col sm={4}>
          <FormText color="muted">이벤트에서 배포할 쿠폰입니다.</FormText>
          <span>{coupon}</span>
        </Col>
      </FormGroup>
    </Form>
  );
}
