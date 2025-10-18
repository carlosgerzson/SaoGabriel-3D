// Dados dos prefeitos de São Gabriel (estrutura inicial)
// Preencha os campos conforme for obtendo as informações reais.
// Cada objeto:
// id: identificador interno (sequencial ou slug)
// nome: string
// periodos: array de strings (ex: ["1997-2000", "2001-2004"]) para reeleições
// foto: caminho para imagem 300x400 (ou null/'' se não houver ainda)
// observacao: texto adicional (comentários, notas históricas, local de nascimento futuramente)

export const prefeitos = [
  { id: 1, nome: 'Coronel Augusto José Seixas', periodos: ['20/11/1930 a 24/05/1932'], foto: 'pref_augusto_jose_seixas.jpg', observacao: '' },
  { id: 2, nome: 'Coronel Garibaldi Tomazi', periodos: ['24/05/1932 a 29/10/1932'], foto: 'pref_garibaldi_tommazi.jpg', observacao: '' },
  { id: 3, nome: 'Alfredo Bento Pereira', periodos: ['29/10/1932 a 21/12/1935'], foto: 'pref_alfredo_bento_pereira.jpg', observacao: '' },
  { id: 4, nome: 'Dr. Celestino Lopes Cavalheiro', periodos: ['21/12/1935 a 01/07/1936'], foto: 'pref_celestino_lopes_cavalheiro.jpg', observacao: '' },
  { id: 5, nome: 'Alfredo Faria', periodos: ['1936 a 1937'], foto: 'pref_alfredo_farias.jpg', observacao: '' },
  { id: 6, nome: 'Antonio Coimbra Gonçalves', periodos: ['1938 a 1944'], foto: 'pref_antonio_coimbra_gonçalves.jpg', observacao: '' },
  { id: 7, nome: 'Dr. Torquato Arleo Petrarca', periodos: ['1944 a 20/11/1945', '13/12/1945 a 31/05/1946'], foto: 'pref_torquato_arleo_petrarca.jpg', observacao: 'Reeleito' },
  { id: 8, nome: 'Dr. Pedro Soares Munhoz', periodos: ['20/11/1945 a 13/12/1945'], foto: 'pref_pedro_soares_munhoz.jpg', observacao: '' },
  { id: 9, nome: 'Dr. Helio Carlomagno', periodos: ['31/05/1946 e 05/12/1946', '21/02/1947 a 30/04/1947'], foto: 'pref_helio_carlomagno.jpg', observacao: 'Reeleito' },
  { id: 10, nome: 'Abir Elisade Dihel', periodos: ['05/12/1946 a 21/02/1947'], foto: 'pref_foto_nao_disponivel.jpg', observacao: '' },
  { id: 11, nome: 'Euclides Fernandes Costa', periodos: ['30/04/1947 a 04/12/1947'], foto: 'pref_foto_nao_disponivel.jpg', observacao: '' },
  { id: 12, nome: 'Aníbal de Lima Machado', periodos: ['04/12/1947 a 31/12/1951'], foto: 'pref_anibal_de_lima_machado.jpg', observacao: '' },
  { id: 13, nome: 'José Sampaio Marques Luz', periodos: ['01/01/1952 a 31/12/1955', '31/12/59 a março de 1961'], foto: 'pref_jose_sampaio_marques_luz.jpg', observacao: 'Reeleito' },
  { id: 14, nome: 'Dr. Juracy da Cunha Gonçalves', periodos: ['01/01/1956 a 31/12/1959'], foto: 'pref_juracy_da_cunha_goncalves.jpg', observacao: '' },
  { id: 15, nome: 'Gastao Álvaro Pereira dos Santos', periodos: ['05/04/1961 a 31/12/1963'], foto: 'pref_gastao_alvaro_pereira_dos_santos.jpg', observacao: '' },
  { id: 16, nome: 'Dr. Inocencio da Cunha Gonçalves', periodos: ['31/12/1963 a 31/01/1969'], foto: 'pref_inocencio_da_cunha_gonçalves.jpg', observacao: '' },
  { id: 17, nome: 'Dr. Alfredo Bento Pereira Filho', periodos: ['31/01/1969 a 31/01/1973'], foto: 'pref_alfredo_bento_pereira_filho.jpg', observacao: '' },
  { id: 18, nome: 'Dr. Erasmo José Dias Chiappetta', periodos: ['31/01/1973 a 31/01/1977'], foto: 'pref_erasmo_jose_dias_chiappetta.jpg', observacao: '' },
  { id: 19, nome: 'Ramiro da Silva Meneghello', periodos: ['31/01/1977 a 31/01/1982'], foto: 'pref_ramiro_da_silva_meneghello.jpg', observacao: '' },
  { id: 20, nome: 'Baltazar Balbo Garragorri Teixeira', periodos: ['01/01/1983 a 31/12/1988', '01/01/1993 a 31/12/1996', '01/01/2005 a 31/12/2008'], foto: 'pref_baltazar_balbo_teixeira.jpg', observacao: 'Reeleito' },
  { id: 21, nome: 'Dr. Eglon Meyer Corrêa', periodos: ['01/01/1989 a 31/12/1992'], foto: 'pref_eglon_meyer_correa.jpg', observacao: '' },
  { id: 22, nome: 'Rossano Dotto Gonçalves', periodos: ['01/01/1997 a 31/12/2000', '01/01/2001 a 31/12/2004', '01/01/2009 a 31/12/2012', '01/01/2017 a 30/03/2022'], foto: 'pref_rossano_dotto_gonçalves.jpg', observacao: 'Reeleito' },
  { id: 23, nome: 'Roque Montagner', periodos: ['01/01/2013 a 31/12/2016'], foto: 'pref_roque_montagner.jpg', observacao: '' },
  { id: 24, nome: 'Lucas Menezes', periodos: ['31/03/2022 – atual'], foto: 'pref_lucas_menezes.jpg', observacao: 'Atual' }
];

// Pref_foto_nao_disponivel.jpg - use quando não houver foto.
