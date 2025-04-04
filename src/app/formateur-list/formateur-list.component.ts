import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-formateurs-list',
  templateUrl: './formateur-list.component.html',
  styleUrls: ['./formateur-list.component.css']
})
export class FormateurListComponent implements OnInit {
  public tableData1: TableData;
  public formateurForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedFormateurIndex: number = -1;
  public selectedFormateur: string[] = null;
  
  // Variables pour contrôler l'affichage des modals
  public showFormateurModal: boolean = false;
  public showDeleteModal: boolean = false;
  employeurs: string[] = ['Entreprise A', 'Entreprise B', 'Entreprise C', 'Freelance'];
  types: string[]=['interne','externe']
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Nom', 'Prénom', 'Email', 'Tel', 'Type', 'Employeur'],
      dataRows: [
        ['1', 'Dakota', 'Rice', 'dakota@gmail.com', '123456789', 'interne', 'Entreprise A'],
        ['2', 'Minerva', 'Hooper', 'minerva@gmail.com', '987654321', 'externe', 'Entreprise A'],
        // ... autres données
      ]
    };

    this.initForm();
  }

  initForm() {
    this.formateurForm = this.formBuilder.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      type: ['', Validators.required],
      employeur: ['', Validators.required]
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedFormateurIndex = -1;
    
    // Generate a new ID
    const nextId = (Math.max(...this.tableData1.dataRows.map(row => parseInt(row[0]))) + 1).toString();
    
    this.formateurForm.reset();
    this.formateurForm.patchValue({
      id: nextId,
      nom: '',
      prenom: '',
      email: '',
      tel: '',
      type: '',
      employeur: ''
    });
    
    this.showFormateurModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedFormateurIndex = index;
    const formateurData = this.tableData1.dataRows[index];
    
    this.formateurForm.patchValue({
      id: formateurData[0],
      nom: formateurData[1],
      prenom: formateurData[2],
      email: formateurData[3],
      tel: formateurData[4],
      type: formateurData[5],
      employeur: formateurData[6]
    });
    
    this.showFormateurModal = true;
  }

  saveFormateur() {
    if (this.formateurForm.invalid) {
      return;
    }
    
    const formValues = this.formateurForm.value;
    const formateurData = [
      formValues.id,
      formValues.nom,
      formValues.prenom,
      formValues.email,
      formValues.tel,
      formValues.type,
      formValues.employeur
    ];
    
    if (this.isEditMode) {
      // Update existing formateur
      this.tableData1.dataRows[this.selectedFormateurIndex] = formateurData;
    } else {
      // Add new formateur
      this.tableData1.dataRows.push(formateurData);
    }
    
    // Close modal
    this.showFormateurModal = false;
    this.formateurForm.reset();
  }

  deleteFormateur(index: number) {
    this.selectedFormateurIndex = index;
    this.selectedFormateur = this.tableData1.dataRows[index];
    this.showDeleteModal = true;
  }

  confirmDelete() {
    // Remove formateur from array
    this.tableData1.dataRows.splice(this.selectedFormateurIndex, 1);
    
    // Close modal
    this.showDeleteModal = false;
    this.selectedFormateurIndex = -1;
    this.selectedFormateur = null;
  }

  closeFormateurModal() {
    this.showFormateurModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
