package com.pessoastrab3.demo;

import jakarta.persistence.*;

@Entity
@Table(name = "pessoa")
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String nome;

    @Column
    private char CPF[];

    @Column
    private char telefone[];

    @Column
    private String endereco;

    @Column
    private String cidade;

    @Column
    private String estado;

    public Pessoa() {
    }

    public Pessoa(String nome, char[] CPF, char[] telefone, String endereco, String cidade, String estado) {
        this.nome = nome;
        this.CPF = CPF;
        this.telefone = telefone;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public char[] getCPF() {
        return CPF;
    }

    public void setCPF(char[] CPF) {
        this.CPF = CPF;
    }

    public char[] getTelefone() {
        return telefone;
    }

    public void setTelefone(char[] telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public long getId() {
        return id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
