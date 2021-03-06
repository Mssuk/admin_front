import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  CardFooter,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import CustomTable2 from '../../layouts/CustomTable2';
import '../../assets/css/relatedPro.css';
import ApiService from '../../apiService/ApiService';
import ModalForR from '../../layouts/ModalForR';
//제이쿼리
import $ from 'jquery';
import jQuery from 'jquery';
//페이지네이션
import Pagination from '../../layouts/Pagination';
import { paginate } from '../../components/utils/Paginate';
//검색박스
import SearchBoxBasic from '../../layouts/SearchBoxBasic';
window.$ = window.jQuery = jQuery;

const tableSubject = [
  '상품번호',
  '상품이름',
  '연관상품1',
  '연관상품2',
  '연관상품3',
  '연관상품4',
  '연관상품5',
];
const styled = ['15.0%', '25.0%', '12.0%', '12.0%', '12.0%', '12.0%', '12.0%'];
const highlight = ['#fdfd96', '#dbffd6', '#ace7ff', '#ecd4ff', '#ffcbc1'];
export default function RelatedProduct() {
  //상품 데이터
  const [productData, setProduct] = useState([]);
  //모달
  const [openModal, setModal] = useState(false);
  //선택한 상품
  const [selectedProduct, selectProduct] = useState('');

  //선택된 row
  const [selectedRow, selectRow] = useState('');

  //현재 페이지
  const [curPage, setCurPage] = useState(1);
  //한 페이지에 몇개 보여줄 건지..
  const pageSize = 8;
  // 검색결과 카운트
  let resultCnt = 0;

  //search options
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
  });

  //page변경 핸들러
  const handleChangePage = (page) => {
    setCurPage(page);
  };

  //search
  const searching = (opts) => {
    setSearchOpt(opts);
    setCurPage(1);
  };

  //토글모달
  const handleToggle = (e, pronum, index, idx) => {
    setModal(!openModal);
    selectRow(trRef[idx]);
    if (selectedRow) {
      $(selectedRow).fadeOut(200).fadeIn(300);
    }

    //선택한 상품의 연관상품 데이터
    const relatedInfo = productData.filter((pro) => pro.pro_num === pronum);
    if (relatedInfo[0])
      selectProduct({
        pro_num: relatedInfo[0].pro_num,
        pro_name: relatedInfo[0].pro_name,
        rec_pro_num1: relatedInfo[0].rec_pro_num1,
        rec_pro_num2: relatedInfo[0].rec_pro_num2,
        rec_pro_num3: relatedInfo[0].rec_pro_num3,
        rec_pro_num4: relatedInfo[0].rec_pro_num4,
        rec_pro_num5: relatedInfo[0].rec_pro_num5,
        index: index,
      });
  };

  useEffect(() => {
    loadingData();
  }, []);

  //ref
  let trRef = [];

  //데이터 로딩
  const loadingData = () => {
    ApiService.fetchRelatedProduct()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  const subject = tableSubject.map((subj, index) => (
    <th style={{ width: styled[index] }} scope="row" key={index}>
      {subj}
    </th>
  ));

  const contents = () => {
    //필터링할 데이터
    let filteredData = [...productData];

    //검색 필터
    const { keyword } = searchOpt;

    //검색어가 있을 경우
    if (keyword !== '') {
      filteredData = productData.filter((data) => {
        return data.product_name.indexOf(keyword) > -1;
      });
    }

    resultCnt = filteredData.length;

    return paginate(filteredData, curPage, pageSize).map((cons, idx) => {
      const elements = [
        cons.rec_pro_num1,
        cons.rec_pro_num2,
        cons.rec_pro_num3,
        cons.rec_pro_num4,
        cons.rec_pro_num5,
      ];
      return (
        <tr key={cons.pro_num} ref={(tr) => (trRef[idx] = tr)}>
          <th>{cons.pro_num}</th>
          <td>{cons.product_name}</td>
          {elements.map((elel, index) => (
            <td key={index}>
              <span style={{ background: highlight[index] }}>
                <strong>{elel}</strong>
              </span>
              <Button
                outline
                color="warning"
                size="sm"
                onClick={(e) => handleToggle(e, cons.pro_num, index, idx)}
              >
                <i className="far fa-edit"></i>
              </Button>
            </td>
          ))}
        </tr>
      );
    });
  };
  return (
    <div className="bodyWrap">
      <Container className="themed-container" fluid={true}>
        <Row md={12}>
          <Col>
            <Card>
              <CardHeader>
                <strong>연관 상품 등록</strong>
                <SearchBoxBasic searching={searching} />
              </CardHeader>
              <CardBody>
                <CustomTable2 tableSubject={subject} contents={contents()} />
              </CardBody>
              <ModalForR
                isOpen={openModal}
                toggle={handleToggle}
                selectedProduct={selectedProduct}
                refresh={loadingData}
              />
              <CardFooter>
                <Pagination
                  itemsCount={resultCnt}
                  pageSize={pageSize}
                  currentPage={curPage}
                  onPageChange={handleChangePage}
                />
                <h5> * 연관상품은 최대 5개까지 등록가능</h5>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
