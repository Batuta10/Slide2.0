import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
@inject('PhotoStore', 'UserStore')
@observer
class PageMobx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            i: 0,
            usuario: []
        };
        this.allImg = this.allImg.bind(this);
        this.pegaUsuarioId = this.pegaUsuarioId.bind(this);
        this.filtraId = this.filtraId.bind(this);
    }
    filtraId() {
        // Traz o obj do Usuario completo e seta ele no State
        this.pegaUsuarioId();
        // Verifica se tem alguma info no state
        if (this.state.usuario.length >= 0) {
            //Atualiza as lista de fotos desponives no Store
            this.props.PhotoStore.getPhoto().then((imgStores) => {
                let newStateImgs = [];
                // Percore o que tem no state que foi trazido
                this.state.usuario[0].idImgs.forEach((element) => {
                    // Percore o que tem no Store PhotoStore
                    imgStores.forEach((x) => {
                        // Verifica se o que  tem no Store e igual o ID das imageno no Usuario
                        if (x.split('_')[0] === element) {
                            newStateImgs.push(x);
                        }
                    });
                    // console.log(toJS(this.props.PhotoStore.img[index].split('_')[0]));
                });
                this.setState({ images: newStateImgs });
            });
        } else alert('Usuario nao encontrado');
    }
    // Traz o obj do Usuario completo e seta ele no State
    pegaUsuarioId() {
        let id = document.querySelector('#userId').value;
        this.setState({ usuario: this.props.UserStore.getUserId(id) });
    }
    // Atualiza o Store e traz para esse arquivo e seta o state
    allImg() {
        this.props.PhotoStore.getPhoto().then((dados) => {
            this.setState({ images: dados });
        });
    }
    // Change Image
    changeImg() {
        document.slide.src = `http://10.17.2.16:3002/getFoto/${this.state.images[this.state.i]}`;

        document.querySelector('#legenda').textContent = this.state.images[this.state.i].split('_')[1].split('.')[0];

        // Check If Index Is Under Max
        if (this.state.i < this.state.images.length - 1) {
            // Add 1 to Index
            this.setState({ i: this.state.i + 1 });
        } else {
            // Reset Back To O
            this.setState({ i: 0 });
        }
    }

    render() {
        var slide = () => {
            return (
                <div>
                    <img name="slide" height="400" alt="" />
                    <p id="legenda" />
                    <button onClick={() => this.changeImg()}>Next</button>
                </div>
            );
        };
        return (
            <div>
                <div>
                    <h1>Filtro</h1>
                    <div>
                        <label for="userId">Digite o id usuario </label>
                        <input name="userId" id="userId" type="number" />
                        <button onClick={this.filtraId}>Filtar</button>
                        <button onClick={this.allImg}>Todas Imagens</button>
                    </div>
                    <h1>Slide</h1>
                    {this.state.images.length === 0 ? <p>Escolha uma opição de filtro acima</p> : slide()}
                </div>
            </div>
        );
    }
}

export default PageMobx;
