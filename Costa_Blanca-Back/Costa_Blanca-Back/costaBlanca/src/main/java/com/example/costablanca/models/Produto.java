package com.example.costablanca.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descricao;
    private String referencia;
    @Column(name = "codigo_auxiliar")
    private String codigoAuxiliar;
    @Column(name = "setor_id")
    private Integer setorId;
    @Column(name = "linha_id")
    private Integer linhaId;
    @Column(name = "marca_id")
    private Integer marcaId;
    @Column(name = "colecao_id")
    private Integer colecaoId;
    @Column(name = "fornecedor_id")
    private Integer fornecedorId;
    @Column(name = "preco_venda")
    private BigDecimal precoVenda;
    @Column(name = "preco_custo")
    private BigDecimal precoCusto;
    @Column(name = "tamanho_id")
    private Integer tamanhoId;
    @Column(name = "cor_id")
    private Integer corId;
    @Column(name = "data_cadastro")
    private Date dataCadastro;
    private Boolean status;
    @Column(name = "tempo_garantia")
    private String tempoGarantia;
    private String peso;
    private String altura;
    private String largura;
    private String comprimento;
    private String observacao;
    private Integer quantidade;
    private Boolean retirado;
    @Transient
    private Boolean isRetirada;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public String getCodigoAuxiliar() {
        return codigoAuxiliar;
    }

    public void setCodigoAuxiliar(String codigoAuxiliar) {
        this.codigoAuxiliar = codigoAuxiliar;
    }

    public Integer getSetorId() {
        return setorId;
    }

    public void setSetorId(Integer setorId) {
        this.setorId = setorId;
    }

    public Integer getLinhaId() {
        return linhaId;
    }

    public void setLinhaId(Integer linhaId) {
        this.linhaId = linhaId;
    }

    public Integer getMarcaId() {
        return marcaId;
    }

    public void setMarcaId(Integer marcaId) {
        this.marcaId = marcaId;
    }

    public Integer getColecaoId() {
        return colecaoId;
    }

    public void setColecaoId(Integer colecaoId) {
        this.colecaoId = colecaoId;
    }

    public BigDecimal getPrecoVenda() {
        return precoVenda;
    }

    public void setPrecoVenda(BigDecimal precoVenda) {
        this.precoVenda = precoVenda;
    }

    public BigDecimal getPrecoCusto() {
        return precoCusto;
    }

    public void setPrecoCusto(BigDecimal precoCusto) {
        this.precoCusto = precoCusto;
    }

    public Integer getTamanhoId() {
        return tamanhoId;
    }

    public void setTamanhoId(Integer tamanhoId) {
        this.tamanhoId = tamanhoId;
    }

    public Integer getCorId() {
        return corId;
    }

    public void setCorId(Integer corId) {
        this.corId = corId;
    }

    public Date getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getTempoGarantia() {
        return tempoGarantia;
    }

    public void setTempoGarantia(String tempoGarantia) {
        this.tempoGarantia = tempoGarantia;
    }

    public String getPeso() {
        return peso;
    }

    public void setPeso(String peso) {
        this.peso = peso;
    }

    public String getAltura() {
        return altura;
    }

    public void setAltura(String altura) {
        this.altura = altura;
    }

    public String getLargura() {
        return largura;
    }

    public void setLargura(String largura) {
        this.largura = largura;
    }

    public String getComprimento() {
        return comprimento;
    }

    public void setComprimento(String comprimento) {
        this.comprimento = comprimento;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Integer getFornecedorId() {
        return fornecedorId;
    }

    public void setFornecedorId(Integer fornecedorId) {
        this.fornecedorId = fornecedorId;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Boolean getRetirado() {
        return retirado;
    }

    public void setRetirado(Boolean retirado) {
        this.retirado = retirado;
    }

    public Boolean getRetirada() {
        return isRetirada;
    }

    public void setRetirada(Boolean retirada) {
        isRetirada = retirada;
    }
}
