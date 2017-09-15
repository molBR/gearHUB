#!/bin/bash

#programa desenvolvido por Pedro Vallese (Comedia)
#tem como funcao checar se todos os serviços do gearhub estão funcionando
#os diretorios a serem abertos estao no arquivo services.txt

i=0
DIRHELP="/home/aluno"
while read line; do 
	services[$i]=$DIRHELP$line #le os diretorios e concatena com o home e user
	check[$i]=false #cria um vetor dinamico de controle.
	((i++))
done < /home/aluno/28882/services.txt #funcao que le o diretorios 

run_Closed(){ #percorre a lista de controle, se algum programa nao esta online, ativa ele.
	i=0
	for checkTrue in "${check[@]}" 
	do
		if [ "$checkTrue" == false ]; then  #se o servico estiver off
			echo "Serviço ${services[$i]}/server.js está offline, ativando..."
			node ${services[$i]} &  #abre o servico
			check[$i]=true #checa que ele esta online
			echo "Serviço online!"
		fi
	((i++))
	done
	echo "Todos os serviços estão online!"
}
	
check_which(){ 
	#SERVICE=`ls -l /proc/$1/cwd`
	SERVICE=`cat /proc/$1/cmdline`
	#echo $SERVICE
	#SUBSTRING=$(echo $SERVICE| cut -d '/' -f 6) #pega o endereco do servico
	SUBSTRING=`echo $SERVICE | sed 's/.*node//'`
#SUBSTRING=${SUBSTRING:1} #corta o primeiro espaco
	for checkSer in "${services[@]}" 
	do
		if [ "$SUBSTRING" == "$checkSer" ] ; then  #checa se o servico eh um dos da lista
			check[$i]=true #se for, checa na lista de controle
		fi
	done
	((i++))
}

check_process(){ #pega todos os processos node
	echo "Fazendo checagem $1"
	teste=`pidof $1 | tr '\ ' "\n"` 
	i=0
	for pids in $teste
	do
		check_which $pids #manda todos os processos node e manda pra prox funcao
	done
	run_Closed #depois de verificar quais servicoes estao ativos, chama a proxima funcao para abrir aqueles que nao estao
}

#timestamp
ts=`date ` #pega o horario
echo $ts: "Checando.." #imprime o horario que foi feito a checagem
cmd="sudo service mongod start"
$cmd
check_process "node" #procura processos com esse nome


