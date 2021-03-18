# 1차 리뷰 정리
* 좀 더 low레벨로 짜보기
* 메모리 해제 destroy 코드 추가
* 스크립트 body 하단으로
* id보다는 element 자체를 인자값으로
* new 생성시 인자 값으로 초기화
* 펑션 ㄴㄴ 클래스 ㅇㅇ
* 충돌체크는 드래그 말고 드롭에서
* 드래그 시작, 중 끝났을때 이벤트 발생 확장시킬 수 있도록
* != ㄴㄴ !== ㅇㅇ
* 타입스크팁트로 짜보세요

# 2차 리뷰
- 아키텍쳐 구조 변경 필요
	- drop에서 drag 의존도 제거
	- 각자 할일만 명확하게 하자
- clean코드&코드 컨벤션
	- _ 붙은 변수 명 사용 제거, 접근 제어자로 사용
	- 위키, oss 참조
	- 중첩된 if 문 사용
	- es6 object spread 코드 사용하여 option 받는 코드 깔끔히 변경
- 기타
	- Draggable 복제/원본 이동 등을 환경 설정으로 가능
	- Droppable 만 'rect', 'pointer', '면적도 추가(비율)'
	- Droppable 의 속성은 class-ui 요소 정도만 제공

# 3차 리뷰
- 성능적인면 고려
    - 같은 객체를 호출하여 여러번 사용하는 경우 단 한번만 할당 받아서 재사용
    - getBoundingRect() 한번만 호출하기
    - 두 번 이상 객체, 메모리 참조하는 코드는 상위에 두고 한번만 선언해서 사용하기
    - element style 을 직접 조작하지 않고, css transform 함수 사용
- clean 코드 관련
    - 오타 제거
    - parseInt(x, 진수); 파라미터 모두 작성
    - dragStart, drag, dragEnd 을 옵션으로 받는 방식 변경
        - 지금 구조에서는 구독을 한 명 밖에 받지 못함
        - event Emitter 로 변경
    - 타입을 빠뜨린 부분이 많음
    - string template 사용 할 것
    - git global 유저 등록하기


#### 실행
`npm install`
`npm start`