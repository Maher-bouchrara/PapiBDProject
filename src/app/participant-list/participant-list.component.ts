import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipantListService } from 'app/services/participant-list.service';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {
  public tableData1: TableData;
  public userForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedUserIndex: number = -1;
  public selectedUser: string[] = null;
  public participants : any;
  public showUserModal: boolean = false;
  public showDeleteModal: boolean = false;
  structures: any[] = [
    { id: 1, name: 'Direction centrale' },
    { id: 2, name: 'Direction régionale' },
  ];
  profiles: any[] = [
    { id: 1, name: 'gestionnaire' },
    { id: 2, name: 'informaticien (bac + 3)' },
    { id: 3, name: 'informaticien (bac + 5)' },
    { id: 4, name: 'juriste' },
    { id: 5, name: 'technicien supérieur' },
  ];
  
  
  constructor(private formBuilder: FormBuilder,private participantService: ParticipantListService) {}

  
  ngOnInit() {
    let data: string[][] = [];
    this.participantService.getAllParticipant().subscribe({
      next: (res) => {
        console.log('Users fetched:', res);
        this.participants = res ;
        data = res.map((user: any) => [
          String(user.id),
          String(user.nom),
          String(user.prenom),
          String(user.structure?.libelle ), 
          String(user.profile?.libelle ),
          String(user.email),
          String(user.tel)
        ]);
        
        console.log("data = ",data);
        },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
      complete: () => {
        console.log('User fetching completed.');
      }
    });

    this.tableData1 = {
      headerRow:  ['ID', 'Nom', 'Prénom', 'Structure', 'Profil', 'Email', 'Téléphone'],
      dataRows: data
    };
  


    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      structure: ['', Validators.required],
      profile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedUserIndex = -1;

    const nextId = (
      Math.max(...this.tableData1.dataRows.map(row => parseInt(row[0]))) + 1
    ).toString();

    this.userForm.reset();
    this.userForm.patchValue({ id: nextId });

    this.showUserModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedUserIndex = index;
    const userData = this.tableData1.dataRows[index];

    this.userForm.patchValue({
      id: userData[0],
      nom: userData[1],
      prenom: userData[2],
      structure: userData[3],
      profile: userData[4],
      email: userData[5],
      telephone: userData[6]
    });

    this.showUserModal = true;
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }
  
    const formValues = this.userForm.value;
  
    // Créer l'objet participant sans les IDs de profile et structure
    const newParticipant = {
      nom: formValues.nom,
      prenom: formValues.prenom,
      email: formValues.email,
      tel: formValues.telephone
    };
    console.log(newParticipant)
    // Récupérer les IDs de profile et structure sélectionnés
    const profileId = formValues.profile; // ID du profil sélectionné
    const structureId = formValues.structure; // ID de la structure sélectionnée
  
    // Envoie de la requête POST avec les IDs de profile et structure en paramètres
    this.participantService.createParticipant(newParticipant, profileId, structureId)
      .subscribe(
        (response) => {
          console.log('Participant créé avec succès', response);
          this.closeUserModal();
          this.userForm.reset();
          this.initForm;
           // Actualiser la liste des participants
          
        },
        (error) => {
          console.error('Erreur lors de la création du participant', error);
        }
      );
  }
  

  deleteUser(index: number) {
    this.selectedUserIndex = index;
    this.selectedUser = this.tableData1.dataRows[index];
    this.showDeleteModal = true;
  }

  confirmDelete() {
    this.tableData1.dataRows.splice(this.selectedUserIndex, 1);
    this.showDeleteModal = false;
    this.selectedUserIndex = -1;
    this.selectedUser = null;
  }

  closeUserModal() {
    this.showUserModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
