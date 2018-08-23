import React, { Component } from 'react';
import superagent from 'superagent';

class ListIMG extends Component {
    constructor(props) {
        super(props);
        this.state = { images: props.imgs };
        this.deleteImg = this.deleteImg.bind(this);
        this.upimg = this.upimg.bind(this);
    }

    componentWillReceiveProps(nextProps, prevProps) {
        // imolemete if for diferente arry
        this.setState({ images: nextProps.imgs });
    }

    upimg() {
        const file = document.querySelector('.file').files[0];
        superagent.post('http://10.17.2.16:3002/upFoto').attach('theFile', file).end((err, res) => {
            if (err) console.log(err);
            this.props.getPhoto();
        });
    }

    deleteImg(x) {
        superagent.post('http://10.17.2.16:3002/DeleteFoto').withCredentials().send({ nomeArq: x }).end((err, res) => {
            if (err) console.log(err);
            this.props.getPhoto();
        });
    }

    render() {
        return (
            <div>
                <h1>Lista Images</h1>
                <input type="file" name="file" className="file" />
                <button onClick={this.upimg}>Salvar</button>
                <table>
                    <tr>
                        <th>Img</th>
                        <th>Nome</th>
                        <th>Extensão</th>
                        <th>Ação</th>
                    </tr>
                    {this.state.images.map((x) => (
                        <tr>
                            <td>
                                <img
                                    width="100"
                                    height="100"
                                    name="slideL"
                                    src={`http://10.17.2.16:3002/getFoto/${x}`}
                                    alt="img"
                                />
                            </td>
                            <td>{x.split('_')[1].split('.')[0]}</td>
                            <td>{x.split('_')[1].split('.')[1]}</td>
                            <td>
                                <button onClick={() => this.deleteImg(x)}>&times;</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}

export default ListIMG;
