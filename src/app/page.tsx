'use client'

import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Grid, Option, Select, Sheet, Stack } from "@mui/joy";
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Alert from '../components/alert';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();

  return (

    <Button
      variant="soft" color={mode === 'dark' ? 'warning' : 'primary'}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? <DarkModeIcon color="primary" /> : < WbSunnyIcon color="warning" />}
    </Button>
  );
}


export default function Home() {

  const [result, setResult] = useState('');
  const [tipo, setTipo] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');
  const [tipoBotao, setTipoBotao] = useState(0);


  //Código para o calculo de matrizes
  function multiplicarMatrizes(matriz1: number[][], matriz2: number[][]) {
    var result: number[][] = [];
    for (var i = 0; i < matriz1.length; i++) {
      result[i] = [];
      for (var j = 0; j < matriz2[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < matriz1[0].length; k++) {
          sum += matriz1[i][k] * matriz2[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  //Array com o alfabeto e sues valores
  var chars: { [key: string]: number } = {
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15, 'g': 16, 'h': 17, 'i': 18, 'j': 19,
    'k': 20, 'l': 21, 'm': 22, 'n': 23, 'o': 24, 'p': 25, 'q': 26, 'r': 27, 's': 28, 't': 29,
    'u': 30, 'v': 31, 'w': 32, 'x': 33, 'y': 34, 'z': 35, ' ': 36, '*': 37, '': 38,
    'á': 39, 'à': 40, 'ã': 41, 'â': 42, 'é': 43, 'ê': 44, 'í': 45, 'ó': 46, 'ô': 47,
    'õ': 48, 'ú': 49, 'ç': 50, 'A': 51, 'B': 52, 'C': 53, 'D': 54, 'E': 55, 'F': 56,
    'G': 57, 'H': 58, 'I': 59, 'J': 60, 'K': 61, 'L': 62, 'M': 63, 'N': 64, 'O': 65,
    'P': 66, 'Q': 67, 'R': 68, 'S': 69, 'T': 70, 'U': 71, 'V': 72, 'W': 73, 'X': 74,
    'Y': 75, 'Z': 76, '!': 77, '?': 78, '(': 79, ')': 80, '¡': 81, '¿': 82, '.': 83,
    'Á': 84, 'À': 85, 'Ä': 86, 'Å': 87, 'Æ': 88, 'È': 89, 'Ê': 90, 'Ë': 91, 'Ì': 92,
    'Í': 93, 'Î': 94, 'Ï': 95, 'Ð': 96, 'Ñ': 97, 'Ò': 98, 'Ó': 99, 'Ô': 100, 'Õ': 101,
    'Ö': 102, 'Ø': 103, 'Ù': 104, 'Ú': 105, 'Û': 106, 'Ü': 107, 'Ý': 108, 'Þ': 109, 'ß': 110,
    '1': 111, '2': 112, '3': 113, '4': 114, '5': 115, '6': 116, '7': 117, '8': 118, '9': 119,
    '0': 120, ',': 121, ';': 122, ':': 123, '-': 124, '_': 125, '+': 126, '=': 127, '[': 128,
    ']': 129, '{': 130, '}': 131, '#': 132, '@': 133, '$': 134, '%': 135, '^': 136, '&': 137,
    '/': 138, '\\': 139, '<': 140, '>': 141, '|': 142
  };


  //Criando uma matriz com base no texto
  var matriz: number[][] = Array.from({ length: Math.ceil(mensagem.length / 2) }, () => []);


  //loop para encontar os valores com base ao alfabeto
  for (var i = 0; i < mensagem.length; i++) {
    var char = mensagem[i];
    var charEncriptado = chars[char];
    if (charEncriptado !== undefined) {
      var rowIndex = Math.floor(i / 2);
      var columnIndex = i % 2;
      matriz[rowIndex][columnIndex] = charEncriptado; // Insere o caractere encriptado na matriz
    }
  }

  // Transformação da matriz em um array unidimensional
  var unidimensional = matriz.flat(); // Obtém um array unidimensional a partir da matriz

  // Dividindo o array em duas partes
  var meio = Math.ceil(unidimensional.length / 2);
  var matrizzz = [unidimensional.slice(0, meio), unidimensional.slice(meio)]; // Divide o array ao meio e armazena as duas partes em uma nova matriz

  // Adicionando valores extras para que as matrizes tenham o mesmo tamanho
  matrizzz[1].length < matrizzz[0].length ? matrizzz[1].push(38) : null;

  //Criando a chave
  var chave = [[1, 3], [2, 7]];

  //Multiplicando as matrizes
  if (tipo == '1' && mensagem.length != 0) {
    var mensagemCriptografada = multiplicarMatrizes(chave, matrizzz);
  }

  //**********************  Descriptografia  *********************************



  //pegando o valor criptografado e transformando em um array de inteiros
  if (tipo === '2' && mensagem.length != 0) {

    let valoresSeparados = mensagem.split(',').map((value) => parseInt(value));

    var meio = Math.ceil(valoresSeparados.length / 2);
    var matrizzz2 = [valoresSeparados.slice(0, meio), valoresSeparados.slice(meio)];

    // var determinante = (chave[0][0] * chave[1][0]) - (chave[0][1] * chave[1][1]);

    // var index1 = chave[0][0] / determinante;
    // var index2 = chave[0][1] / determinante;
    // var index3 = chave[1][0] / determinante;
    // var index4 = chave[1][1] / determinante;

    // var chaveReversa = [[index4, -index2], [-index3, index1]];

    var chaveReversa = [[7, -3], [-2, 1]];

    var menssagemDescriptografada = multiplicarMatrizes(chaveReversa, matrizzz2);

  }

  const descriptografar = () => {
    if (tipo === '2' && mensagem.length != 0 && tipoBotao === 2) {
      var valormensagem = "";
      for (var i = 0; i < menssagemDescriptografada.length; i++) {
        for (var j = 0; j < menssagemDescriptografada[i].length; j++) {
          var charDescriptografado = Object.keys(chars).find(key => chars[key] === menssagemDescriptografada[i][j]);
          if (charDescriptografado !== undefined) {
            valormensagem += charDescriptografado;
          }
        }
      }
      setResult(valormensagem);
    }
  }

  useEffect(() => {
    if (tipo === '1' && mensagem.length != 0 && tipoBotao === 1) {
      setResult(tipoBotao === 1 ? mensagemCriptografada.toString() : '');
    }
    descriptografar();
  }, [matrizzz, descriptografar, tipoBotao]);

  return (
    <Sheet sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', padding: 0, margin: 0 }}>

      <Sheet sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: 0, mt: '30px', gap: 2 }}>
        <Sheet sx={{ bgcolor: 'background.body', position: 'fixed', top: 50, right: 50 }}>
          <CssVarsProvider>
            <ModeToggle />
          </CssVarsProvider>
        </Sheet>
        <Box>
          <Select value={tipo} onChange={(_, v) => { setTipo(v ? v : '1'); setMensagem(''); setResult(''); }}>
            <Option value="1">Criptografar</Option>
            <Option value="2">Descriptografar</Option>
          </Select>
        </Box>
      </Sheet>
      <Stack
        direction={{ xs: 'column', sm: 'row'}}
        sx={{  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mt: '30px' }}
        width={{ xs: 600, sm: 600, md: 800, lg: 1000 }}
      >
        <Textarea
          placeholder="Digite o texto que sera criptografado"
          minRows={2}
          maxRows={4}
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          sx={{ width: '50%', minHeight: 300, mt: 2, position: 'relative', pt: 3 }}
          startDecorator={<Button sx={{ right: 5, top: 3, position: 'absolute', bgcolor: 'transparent', zIndex: 1, color: 'red', cursor: 'pointer', p: 0, transition: 'all 0.4s', '&:hover': { bgcolor: 'transparent' }, '&:disabled': { bgcolor: 'transparent' } }} onClick={() => { setMensagem(''); }} disabled={mensagem.length == 0}><DeleteForeverIcon /></Button>}
          endDecorator={
            <Typography level="body-xs" sx={{ ml: 'auto' }}>
              {mensagem.length} character(s)
            </Typography>
          }
        />
        <Textarea
          placeholder="Aqui sera exibido a criptografia..."
          minRows={2}
          maxRows={4}
          value={result.length == 1 ? '' : result}
          sx={{ width: '50%', minHeight: 300, mt: 2, pt: 3, position: 'relative' }}
          startDecorator={
            <Box
              sx={{ display: mensagem.length < 1 ? 'none' : 'block', right: 5, top: 3, position: 'absolute', zIndex: 1, color: 'neutral.plainHoverColor', cursor: 'pointer', p: 0, bgcolor: 'transparent', transition: 'all 0.7s', '&:hover': { bgcolor: 'transparent' } }}
              onClick={() => { navigator.clipboard.writeText(result); }}
            >
              <Alert message={tipo == "0" ? 'Texto Descriptografado copiado' : 'Texto Criptografado copiado'} />
            </Box>}
          readOnly
        />
      </Stack>
      <Button
        sx={{ py: 1, px: 20, mt: 7, maxWidth: 300, transition: 'all 0.7s' }}
        onClick={(event) => {
          event.preventDefault(); // Prevent the default behavior of the button
          if (tipo === '1') {
            setTipoBotao(1);
          } else {
            setTipoBotao(2);
          }
        }}
        color={tipo === '1' ? 'primary' : 'success'}
      >
        {tipo == '1' ? 'Criptografar' : 'Descriptografar'}
      </Button>
    </Sheet>
  );
}