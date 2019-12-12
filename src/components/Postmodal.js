import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Postmodal extends React.Component{
    render() {
        return (
            <div className="modal-container">
                <div className="modal-wrapper-top">
                    <div className="modal-layout-title">
                        레이아웃 설정
                    </div>
                    <div className="modal-layout-wrapper">
                        <div className="modal-editor">
                            에디터만
                        </div>
                        <div className="modal-all">
                            둘 다 보기
                        </div>
                        <div className="modal-preview">
                            미리보기만
                        </div>
                    </div>
                </div>
                <div className="modal-wrapper-bot">
                    <div className="modal-presave-title">
                        임시 저장 기록
                    </div>
                    <div className="modal-presave-wrapper">
                        <div className="modal-presave">
                            임시 저장된 내용이 없습니다.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Postmodal