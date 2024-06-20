package com.pessoastrab3.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class PessoaController {

    @Autowired
    PessoaRepository rep;

    /*
     * GET /api/pessoas : lista todas pessoas
     */
    @GetMapping("/pessoas")
    public  ResponseEntity<List<Pessoa>> getAllPessoas(@RequestParam(required = false) String nome)
    {
        try
        {
            List<Pessoa> la = new ArrayList<Pessoa>();

            if (nome == null)
                rep.findAll().forEach(la::add);
            else
                rep.findByNomeContaining(nome).forEach(la::add);

            if (la.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(la, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * GET /api/pessoas/:id : listar pessoa dado um id
     */
    @GetMapping("/pessoas/{id}")
    public ResponseEntity<Pessoa> getPessoaById(@PathVariable("id") long id)
    {
        Optional<Pessoa> data = rep.findById(id);

        if (data.isPresent())
            return new ResponseEntity<>(data.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /*
     * POST /api/pessoas : criar pessoa
     */
    @PostMapping("/pessoas")
    public ResponseEntity<Pessoa> createPessoa(@RequestBody Pessoa p)
    {
        try {
                Pessoa _p = rep.save(new Pessoa(p.getNome(), p.getCPF(), p.getTelefone(), p.getEndereco(), p.getCidade(), p.getEstado()));
            return new ResponseEntity<>(_p, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    /*
     * PUT /api/pessoas/:id : atualizar uma pessoa dado um id
     */
    @PutMapping("/pessoas/{id}")
    public ResponseEntity<Pessoa> updatePessoa(@PathVariable("id") long id, @RequestBody Pessoa p)
    {
        Optional<Pessoa> data = rep.findById(id);

        if (data.isPresent())
        {
            Pessoa pr = data.get();
            pr.setNome(p.getNome());
            pr.setCPF(p.getCPF());
            pr.setTelefone(p.getTelefone());
            pr.setEndereco(p.getEndereco());
            pr.setCidade(p.getCidade());
            pr.setEstado(p.getEstado());
            return new ResponseEntity<>(rep.save(pr), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    /*
     * DEL /api/pessoas/:id : remover pessoa dado um id
     */
    @DeleteMapping("/pessoas/{id}")
    public ResponseEntity<HttpStatus> deletePessoa(@PathVariable("id") long id)
    {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * DEL /api/pessoas : remover todos os registros de pessoas
     */
    @DeleteMapping("/pessoas")
    public ResponseEntity<HttpStatus> deleteAllPessoas()
    {
        try {
            rep.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}

